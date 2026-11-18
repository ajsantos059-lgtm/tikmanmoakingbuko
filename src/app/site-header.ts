import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-site-header',
  standalone: true,
  templateUrl: './site-header.html',
  styleUrl: './site-header.css',
})
export class SiteHeader {
  @Input() itemCount = 0;
  @Output() openCart = new EventEmitter<void>();
}
