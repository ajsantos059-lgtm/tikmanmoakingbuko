import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  async function createHomeFixture() {
    const fixture = TestBed.createComponent(App);
    fixture.componentInstance.orderStore.clearCart();
    fixture.componentInstance.orderStore.closeAddModal();
    await TestBed.inject(Router).navigateByUrl('/');
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture;
  }

  it('should render the Buko Sarap storefront and menu', async () => {
    const fixture = await createHomeFixture();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('#hero-title')?.textContent).toContain('Preskong saya');
    expect(compiled.querySelectorAll('.product-card').length).toBe(6);
  });

  it('should open the product detail page when its image is clicked', async () => {
    const fixture = await createHomeFixture();
    const compiled = fixture.nativeElement as HTMLElement;

    compiled.querySelector<HTMLAnchorElement>('.product-visual')?.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(TestBed.inject(Router).url).toBe('/product/classic');
    expect(compiled.querySelector('.detail-copy h1')?.textContent).toContain('Classic Buko');
  });

  it('should add the selected quantity after modal confirmation', async () => {
    const fixture = await createHomeFixture();
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.componentInstance.orderStore.setShippingDetails({
      name: 'Alex Santos',
      phone: '09171234567',
      fulfillment: 'Delivery',
      address: {
        street: '123 Main Street',
        barangay: 'San Isidro',
        city: 'Makati',
        postalCode: '1234',
      },
    });

    compiled.querySelector<HTMLButtonElement>('.add-button')?.click();
    fixture.detectChanges();
    expect(compiled.querySelector('.add-modal')).toBeTruthy();
    expect(compiled.querySelector('.cart-count')?.textContent?.trim()).toBe('0');

    compiled.querySelector<HTMLButtonElement>('.quantity-input button:last-child')?.click();
    fixture.detectChanges();
    expect(compiled.querySelector('.modal-total')?.textContent).toContain('₱70');

    compiled.querySelector<HTMLButtonElement>('.confirm-button')?.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(compiled.querySelector('.add-modal')).toBeNull();
    expect(compiled.querySelector('.cart-count')?.textContent?.trim()).toBe('2');
    compiled.querySelector<HTMLButtonElement>('.cart-button')?.click();
    fixture.detectChanges();
    expect(compiled.querySelector('.cart-drawer')?.textContent).toContain('123 Main Street');
  });

  it('should require delivery details before adding a drink to the cart', async () => {
    const fixture = await createHomeFixture();
    const compiled = fixture.nativeElement as HTMLElement;

    compiled.querySelector<HTMLButtonElement>('.add-button')?.click();
    fixture.detectChanges();
    expect(compiled.querySelector('.add-modal')).toBeTruthy();
    await fixture.whenStable();
    fixture.detectChanges();

    compiled.querySelector<HTMLButtonElement>('.confirm-button')?.click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(compiled.querySelector('.add-modal')).toBeTruthy();
    expect(compiled.querySelector('.cart-count')?.textContent?.trim()).toBe('0');
    expect(compiled.querySelectorAll('.field-error').length).toBeGreaterThan(0);
  });

  it('should filter the menu by search text', async () => {
    const fixture = await createHomeFixture();
    const compiled = fixture.nativeElement as HTMLElement;
    const search = compiled.querySelector<HTMLInputElement>('input[type="search"]');

    if (!search) {
      throw new Error('Menu search field was not rendered.');
    }

    search.value = 'mango';
    search.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();

    expect(compiled.querySelectorAll('.product-card').length).toBe(1);
    expect(compiled.querySelector('.product-card h3')?.textContent).toContain('Mango Coco');
  });
});
