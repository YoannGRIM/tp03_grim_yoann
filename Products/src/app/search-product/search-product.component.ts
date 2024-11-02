import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-product.component.html',
  styleUrl: './search-product.component.css'
})
export class SearchProductComponent {
  searchQuery: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  
  @Output() search: EventEmitter<{ query: string, minPrice: number | null, maxPrice: number | null }> = new EventEmitter();

  onSearch() {
    this.search.emit({ query: this.searchQuery, minPrice: this.minPrice, maxPrice: this.maxPrice });
  }
}
