import { NgFor } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ProductComponent } from '../components/product/product.component';
import { Product } from '../model/product.type';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  imports: [ProductComponent, NgFor],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  productsService = inject(ProductsService);
  productItems = signal<Array<Product>>([]);

  ngOnInit(): void {
    this.productItems.set(this.productsService.mockProducts);
  }
}
