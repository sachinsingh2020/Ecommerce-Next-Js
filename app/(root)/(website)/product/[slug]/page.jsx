import axios from "axios";
import ProductDetails from "./ProductDetails";

export default async function ProductPage({ params, searchParams }) {
  const { slug } = await params;
  const { color, size } = await searchParams;

  let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/details/${slug}`;

  if (color && size) {
    url += `?color=${color}&size=${size}`;
  }

  const { data: getProduct } = await axios.get(url);

  if (!getProduct.success) {
    return (
      <div className="flex justify-center items-center py-10 h-[300px]">
        <h1 className="text-4xl font-semibold">Data not Found</h1>
      </div>
    );
  } else {
    return (
      <ProductDetails
        product={getProduct?.data?.product}
        variant={getProduct?.data?.variant}
        colors={getProduct?.data?.colors}
        sizes={getProduct?.data?.sizes}
        reviewCount={getProduct?.data?.reviewCount}
      />
    );
  }
}
