import ProductList from "../../components/ProductList/ProductList";

import "./Home.scss";

export default function () {
  return (
    <div id="Home">
      <h2>
        U našoj ponudi možete pronaći samo 387 handmade proizvode. Podržimo male
        biznise kupovinom domaćeg. Kupujmo 387
      </h2>

      <ProductList />
    </div>
  );
}
