export interface filtrosImport {
    
        ok?:     boolean;
        filtro?: Filtro[];
    }
    
    export interface Filtro {
        Total?:     string;
        productId?: number;
        product?:   Product;
    }
    
    export interface Product {
        id?:         number;
        REFERENCIA?: string;
        NOMBRE?:     string;
        CATEGORIA?:  string;
        UNIDAD?:     string;
        GENERACION?: string;
        ESTADO?:     number;
        createdAt?:  Date;
        updatedAt?:  Date;
    }
    