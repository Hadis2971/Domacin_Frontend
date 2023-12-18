import Image from "react-bootstrap/Image";

import "./Product.scss";

export default function () {
  return (
    <div className="product-container">
      <div className="image-container">
        <Image src="https://juliemarieeats.com/wp-content/uploads/2023/01/Bakery-Style-Chocolate-Chip-Cookies-14-scaled.jpg" />
      </div>
      <div className="info-container">
        <h3>Title Of Cookies</h3>
        <div>sasas, sasasa, asasas, asasas</div>
        <div className="price">17.99$</div>
        <div className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempor
          urna risus, a placerat mauris venenatis non. Pellentesque dapibus,
          massa vitae semper tincidunt, felis libero eleifend diam, ac rutrum
          tellus enim eget mi. Aenean cursus efficitur eros, quis vestibulum
          ligula suscipit in. Nam laoreet odio mi, nec porta mauris rhoncus eu.
          Proin eget iaculis leo. Nulla mi ligula, vulputate vitae gravida nec,
          placerat sed lorem. Pellentesque cursus ornare nisl, in suscipit mi
          faucibus eu. Duis lacinia nunc ac est placerat, eu posuere sapien
          bibendum. Curabitur rutrum odio et ante pretium lacinia. Suspendisse
          risus ante, ultrices eu ex eu, mattis rutrum leo. Vestibulum rhoncus
          semper est a mattis. Duis eleifend sollicitudin ex, ac euismod est.
        </div>
      </div>
    </div>
  );
}
