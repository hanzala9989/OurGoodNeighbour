import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemingServiceService {
  private primaryColor = '#3498db';
  private secondaryColor = '#e74c3c';
  private fontFamily = 'Arial, sans-serif';

  constructor(private themeService: ThemingServiceService){}

  setPrimaryColor(color: string) {
    this.primaryColor = color;
    document.documentElement.style.setProperty('--primary-color', color);
  }

  setSecondaryColor(color: string) {
    this.secondaryColor = color;
    document.documentElement.style.setProperty('--secondary-color', color);
  }

  setFontFamily(font: string) {
    this.fontFamily = font;
    document.documentElement.style.setProperty('--font-family', font);
  }

  changePrimaryColor(color: string) {
    this.themeService.setPrimaryColor(color);
  }

  changeSecondaryColor(color: string) {
    this.themeService.setSecondaryColor(color);
  }

  changeFontFamily(font: string) {
    this.themeService.setFontFamily(font);
  }
}
