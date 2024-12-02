import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Product } from '../model/product.type';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  productsService = inject(ProductsService);
  productItems = signal<Array<Product>>([]);

  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'price',
    'stock',
    'campaigns',
  ];
  dataSource!: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.productItems.set(this.productsService.mockProducts);
    this.dataSource = new MatTableDataSource(this.productItems());
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = (data: Product, filter: string) => {
      return data.name.toLowerCase().includes(filter); // Filter by name
    };
    this.adjustColumnVisibility();
    window.addEventListener('resize', () => this.adjustColumnVisibility());
  }
  adjustColumnVisibility() {
    if (window.innerWidth < 550) {
      this.displayedColumns = ['id', 'name', 'campaigns'];
    } else if (window.innerWidth < 768) {
      this.displayedColumns = ['id', 'name', 'price', 'stock', 'campaigns'];
    } else {
      this.displayedColumns = [
        'id',
        'name',
        'description',
        'price',
        'stock',
        'campaigns',
      ];
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.connect();
  }

  manageCampaigns(productId: number) {
    this.router.navigate(['/campaigns', productId]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;
  }

  constructor(private router: Router) {}
}
