export interface CreateProductBasicInformationBody {
  category_id: string;
  brand_id: string;
  title: string;
  description: string;
  uom_id: string;
  tags: string[];
  price: string;
  compare_at_price: string;
  cost_per_item: string;
  profit: string;
  margin: string;
};

export interface CreateProductShippingInformationBody {
  physical_product: boolean;
  weight: number;
};

export interface CreateProductSeoInformationBody {
  page_title: string;
  meta_keywords: string;
  meta_description: string;
};
