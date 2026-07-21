@description('Azure region for all resources')
param location string = resourceGroup().location

@description('Name used for the Container App and to derive related resource names')
param appName string = 'spear-exteriors-ui'

@description('Full container image reference, e.g. ghcr.io/chris-briddock/spear-exteriors-ui:<sha>')
param containerImage string

@description('GHCR username used to pull the image. Leave empty if the package is public.')
param ghcrUsername string = ''

@secure()
@description('GHCR PAT (read:packages) used to pull the image. Leave empty if the package is public.')
param ghcrPassword string = ''

@secure()
param gocardlessAccessToken string = ''

param gocardlessEnvironment string = 'sandbox'

param siteUrl string = ''

@secure()
param gocardlessWebhookSecret string = ''

param allowedHosts string = ''

param minReplicas int = 0
param maxReplicas int = 3

var logAnalyticsName = '${appName}-logs'
var envName = '${appName}-env'
var usesPrivateRegistry = !empty(ghcrUsername)

resource logAnalytics 'Microsoft.OperationalInsights/workspaces@2023-09-01' = {
  name: logAnalyticsName
  location: location
  properties: {
    sku: { name: 'PerGB2018' }
    retentionInDays: 30
  }
}

resource containerAppEnv 'Microsoft.App/managedEnvironments@2024-03-01' = {
  name: envName
  location: location
  properties: {
    appLogsConfiguration: {
      destination: 'log-analytics'
      logAnalyticsConfiguration: {
        customerId: logAnalytics.properties.customerId
        sharedKey: logAnalytics.listKeys().primarySharedKey
      }
    }
  }
}

resource containerApp 'Microsoft.App/containerApps@2024-03-01' = {
  name: appName
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    managedEnvironmentId: containerAppEnv.id
    configuration: {
      ingress: {
        external: true
        targetPort: 4000
        transport: 'auto'
        allowInsecure: false
      }
      registries: usesPrivateRegistry ? [
        {
          server: 'ghcr.io'
          username: ghcrUsername
          passwordSecretRef: 'ghcr-password'
        }
      ] : []
      secrets: concat(
        usesPrivateRegistry ? [{ name: 'ghcr-password', value: ghcrPassword }] : [],
        !empty(gocardlessAccessToken) ? [{ name: 'gocardless-access-token', value: gocardlessAccessToken }] : [],
        !empty(gocardlessWebhookSecret) ? [{ name: 'gocardless-webhook-secret', value: gocardlessWebhookSecret }] : []
      )
    }
    template: {
      containers: [
        {
          name: appName
          image: containerImage
          resources: {
            cpu: json('0.25')
            memory: '0.5Gi'
          }
          env: concat(
            [
              { name: 'PORT', value: '4000' }
              { name: 'GOCARDLESS_ENVIRONMENT', value: gocardlessEnvironment }
              { name: 'SITE_URL', value: siteUrl }
              { name: 'ALLOWED_HOSTS', value: allowedHosts }
            ],
            !empty(gocardlessAccessToken) ? [{ name: 'GOCARDLESS_ACCESS_TOKEN', secretRef: 'gocardless-access-token' }] : [],
            !empty(gocardlessWebhookSecret) ? [{ name: 'GOCARDLESS_WEBHOOK_SECRET', secretRef: 'gocardless-webhook-secret' }] : []
          )
          probes: [
            {
              type: 'Liveness'
              httpGet: { path: '/', port: 4000 }
              initialDelaySeconds: 10
              periodSeconds: 30
            }
            {
              type: 'Readiness'
              httpGet: { path: '/', port: 4000 }
              initialDelaySeconds: 5
              periodSeconds: 10
            }
          ]
        }
      ]
      scale: {
        minReplicas: minReplicas
        maxReplicas: maxReplicas
        rules: [
          {
            name: 'http-scale'
            http: {
              metadata: {
                concurrentRequests: '50'
              }
            }
          }
        ]
      }
    }
  }
}

output containerAppFqdn string = containerApp.properties.configuration.ingress.fqdn
