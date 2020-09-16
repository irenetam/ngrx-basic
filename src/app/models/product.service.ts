import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product.model';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable()
export class ProductService {
    private productsUrl = 'https://5f5add4b044570001674c3a7.mockapi.io/api/v1/product';
    selectedProductSource = new BehaviorSubject<Product | null>(null);
    selectedProductChanges$ = this.selectedProductSource.asObservable();
    private products: Product[];

    constructor(private http: HttpClient) { }

    changeSelectedProduct(selectedProduct: Product | null): void {
        this.selectedProductSource.next(selectedProduct);
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.productsUrl)
            .pipe(
                tap(data => this.products = data),
                catchError(this.handleError)
            );
    }

    createProduct(product: any): Observable<Product> {
        const headers = new HttpHeaders({ 'Content-Type': 'applications/json'});
        const newProduct = { ...product, id: null };
        return this.http.post<Product>(this.productsUrl, newProduct, { headers })
        .pipe(
            tap(data => console.log('createProduct: ' + JSON.stringify(data))),
            catchError(this.handleError)
          );
    }

    updateProduct(product: any): Observable<Product> {
        const headers = new HttpHeaders({ 'Content-Type': 'applications/json'});
        const url = `${this.productsUrl}/${product.id}`;
        console.log(url);
        return this.http.put<Product>(url, product, { headers })
        .pipe(
            tap(data => console.log('updateroduct: ' + product.id)),
            map(() => product),
            catchError(this.handleError)
          );
    }

    deleteProduct(id: string): Observable<{}> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.productsUrl}/${id}`;
        return this.http.delete<Product>(url, { headers })
          .pipe(
            tap(data => console.log('deleteProduct: ' + id)),
            catchError(this.handleError)
          );
      }

    private handleError(err: any): Observable<never> {
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
        }
        console.error(err);
        return throwError(errorMessage);
    }
}
