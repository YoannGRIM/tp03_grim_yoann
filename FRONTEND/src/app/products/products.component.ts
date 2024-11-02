import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { Product } from '../models/product';
import { SearchProductComponent } from '../search-product/search-product.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, SearchProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  products$!: Observable<Product[]>
  filteredProducts$!: Observable<Product[]>;

  constructor(private apiService: ApiService) {
    
  }

  ngOnInit(): void {
    this.products$ = this.apiService.getProducts();
    this.filteredProducts$ = this.products$;
  }

  onSearch(criteria: { query: string, minPrice: number | null, maxPrice: number | null }) {
    this.filteredProducts$ = this.products$.pipe(
      map(products => products.filter(product => {
        const matchesQuery = product.name.toLowerCase().includes(criteria.query.toLowerCase()) ||
                             product.description.toLowerCase().includes(criteria.query.toLowerCase());
        const matchesMinPrice = criteria.minPrice === null || product.price >= criteria.minPrice;
        const matchesMaxPrice = criteria.maxPrice === null || product.price <= criteria.maxPrice;
        return matchesQuery && matchesMinPrice && matchesMaxPrice;
      }))
    );
  }
}
