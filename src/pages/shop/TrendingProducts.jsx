import { useState } from "react";
import Loading from "../../components/Loading";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";
import ProductCards from "./ProductCards";

const TrendingProducts = () => {
    const [visibleProducts, setVisibleProducts] = useState(8);

    const loadMoreProducts = () => {
        setVisibleProducts((prevCount) => prevCount + 4);
    };

    const { data: { products = [], totalPages, totalProducts } = {}, error, isLoading } = useFetchAllProductsQuery({ limit: visibleProducts });

    if (isLoading) return <Loading />;

    // Separate products with and without oldPrice
    const productsWithOldPrice = products.filter(product => product.oldPrice);
    const productsWithoutOldPrice = products.filter(product => !product.oldPrice);

    // Merge them, keeping products with oldPrice first
    const sortedProducts = [...productsWithOldPrice, ...productsWithoutOldPrice];

    return (
        <section className="section__container product__container">
            <h2 className="section__header">New Products</h2>
            <p className="section__subheader mb-12">We sell quality in a resonable price</p>

            {/* Product Cards */}
            <div className="mt-12">
                <ProductCards products={sortedProducts.slice(0, visibleProducts)} />
            </div>

            {/* Load More Button */}
            <div className="product__btn">
                {visibleProducts <= sortedProducts.length && (
                    <button className="btn" onClick={loadMoreProducts}>Load More</button>
                )}
            </div>
        </section>
    );
};

export default TrendingProducts;
