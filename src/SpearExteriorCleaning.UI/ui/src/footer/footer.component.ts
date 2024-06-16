import { Component } from '@angular/core';
import { NgClass, NgFor, NgOptimizedImage } from '@angular/common';
import { FooterItemProps } from './footer-item-props';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgFor, NgClass, NgOptimizedImage],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})

export class FooterComponent {
  footerItems: FooterItemProps[] = [
    { 
      id: 1, 
      title: 'Legal', 
      content: 'The information provided on this website is for general informational purposes only. While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.', 
      expanded: false 
    },
    { 
      id: 2, 
      title: 'Frequently Asked Questions', 
      content: 'Q: How do you clean the windows? <br><br>A: Using the broom thingy that squirts water, in the industry its called a water fed pole, they come in a verity of materials I use a carbon fibre mix pole that has a lot of strength and a nylon brush heads this is soft and allows for careful cleaning but also means that all the parts around the windows including vents get cleaned and cleared, the water used is purified meaning it has been treated and all the impurities removed, there a science behind this but I wont bore you with the details. <br><br>Q: Can my windows be cleaned in the rain? <br><br>A: Yes, windows can still be cleaned in the rain, providing it isn\'t a torrential downpour, light drizzle or a light rain the finish on the windows will still have the same stunning results, why? this is due to the fact that Pure water is used and this is distilled and had all impurities removed much like the rain, unless its sand rain blown over from the Sahara or a particularly windy day, rain is all good. <br><br>Q: How often should I get my windows done? <br><br>A: This is entirely down to you, I offer a few options for Regular window cleaning, every 4, 6 or 8 weeks some people opt for every 3 Months, or a adhoc basis, my most popular time frame is 8 weeks. <br><br>Q: Where do you cover? <br><br>A: Bedfordshire, Buckinghamshire, Hertfordshire, this includes all of Milton Keynes area <br><br>Q: When should i get my gutter cleared? <br><br>A: Gutters should be cleared at least twice a year if you live near an area with a lot of overhanging trees or if you have a lot of moss growing on your roof, if you have a gutter that is overflowing then an inspection is required and then a clear may be advised, blocked gutters can lead to dampness in the house and issues with the brickwork. <br><br>Q: What is involved in a gutter clearing? <br><br>A full inspection of the gutters will be carried out first to ensure that they need doing, all downpipes are checked and flowaways checked for blockages, I use a vac system to suck out any debris in the gutters, meaning no mess left behind, at the same time, a video recording and photos are taken of the clean, this ensures that all the debris are removed and gives you peace of mind and evidence that the guttering is now cleared and in working order. <br><br>Q: Do you fix guttering? <br><br>A: Yes, although sometimes guttering has been discontinued and may not be possible to source this would mean possibly replacing the guttering as a whole, I also can realign and correct any issues on the guttering. <br><br>Q: Do you Clean Fascia\'s and soffits? <br><br>A: Yes, I clean fascia\'s and soffits this includes the exterior of the guttering, when cleaned I also use a polish on the plastics to really make them look great. <br><br>Q: Do you clean conservatory roofs? <br><br>Yes, conservatory roofs are cleaned as a separate clean as they are a much more vigorous clean meaning that more time is needed and cleaning equipment required. <br><br>Q: Can you pressure wash my driveway? <br><br>A: Yes, brick Driveways will need to be resanded before you can drive on it after the work is done, ideally this needs to be done on a dry day as the sand must be dry to fill the voids. <br><br>Q: Will the weeds grow back? <br><br>A: Yes, as much as I\'d love to say no, they will grow back, only regular maintenance will keep them away. <br><br>Q: What is soft washing? <br><br>A: Soft washing, is a lot easier than it sounds and you have more than likely done soft washing at some point, soft washing is using a chemical mix to perform the clean on an area that is sensitive to pressure such as an old wall or render on the outside of a house, soft washing can be done using a variety of chemicals in different mix ratios, normally mixed and then left to do its thing on the area that is targeted to be cleaned, it\'s then scrubbed and rinsed away. <br><br>Q: Tea or Coffee? <br><br>A: Coffee little bit of milk no sugar, tea bit of milk and 1 sugar', 
      expanded: false 
    },
    { 
      id: 3, 
      title: 'Terms and Conditions', 
      content: 'By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. Additionally, when using this website’s services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement. If you do not agree to abide by the above, please do not use this service.', 
      expanded: false 
    },
    {
      id: 4,
      title: 'Cookie Policy',
      content: 'We use cookies to improve your experience on our site. Cookies are small files that a website or its service provider downloads to your computer’s hard drive through your web browser (if you allow) that enables the website’s or service provider’s systems to recognize your browser, capture and remember certain information.',
      expanded: false
    },
    { 
      id: 5, 
      title: 'Contact Details', 
      content: 'T: 07498 070462 <br> E: info@spearexteriors.co.uk ', 
      expanded: false 
    },
  ];
  

  paymentMethods: { src: string, alt: string }[] = [
    { src: 'assets/Mastercard-Logo.png', alt: 'Mastercard' },
    { src: 'assets/Apple-Pay.png', alt: 'Apple Pay' },
    { src: 'assets/paypal-color.svg', alt: 'PayPal' },
    { src: 'assets/GooglePay.png', alt: 'Google Pay' },
    { src: 'assets/VISA.png', alt: 'VISA' }
  ];

  public toggleAccordionItem(item: FooterItemProps): void {
    item.expanded = !item.expanded;
  }

  public getTextColorClass(index: number): string {
    const classes = ['text-white', 'text-white', 'text-black'];
    return classes[index % classes.length];
  }

  public getFillClass(index: number): string {
    const classes = ['fill-white', 'fill-white', 'fill-gray'];
    return classes[index % classes.length];
  }

  public getBackgroundColour(index: number): string {
    const classes = ['bg-custom-primary', 'bg-custom-light-blue', 'bg-custom-light-grey']
    return classes[index % classes.length];
  }

  public getContentTextColour(index: number): string {
    const classes = ['text-white', 'text-white', 'text-black' ]
    return classes[index % classes.length];
  }
}
