import React, { Component } from "react";
import RowProducts from "./RowProducts";

class ContenRowProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: null,
      rowProduct: [
        {
          title: "Total de productos",
          value: 21,
          color: "primary",
          icon: "fa-solid fa-mug-hot",
        },
        {
          title: "Cantidad de usuarios",
          value: 79,
          color: "success",
          icon: "fas fa-user-friends",
        },
        {
          title: "Categorías de café",
          value: 49,
          color: "warning",
          icon: "fas fa-store"
        },
      ],
      userQuantity: null,
      coffeeCategories: null,
    };
  }
  render() {
    if (!this.state.products) {
      return "Cargando...";
    }

    return (
      <div className="row">
        {/* <!-- Content Row Movies--> */}
        {this.state.rowProduct.map((description) => {
          // eslint-disable-next-line react/no-direct-mutation-state
          this.state.rowProduct[0].value = this.state.products;
          // eslint-disable-next-line react/no-direct-mutation-state
          this.state.rowProduct[1].value = this.state.userQuantity;
          // eslint-disable-next-line react/no-direct-mutation-state
          this.state.rowProduct[2].value = this.state.coffeeCategories;

          return <RowProducts key={description.title} {...description} />;
        })}
        {/* <!-- End movies in Data Base --> */}
      </div>
    );
  }
  async componentDidMount() {
    const products = await fetch(
      "http://localhost:3002/api/table-products"
    ).catch((error) => {
      console.log(error);
    });

    const response = await products.json();

    function countProducts() {
      const countProducts = response.data
        .map((item) => {
          return item.id;
        })
        .reduce((acc) => {
          acc++;
          return acc;
        });

      return countProducts;
    }

    const users = await fetch("http://localhost:3002/api/table-users").catch(
      (error) => {
        console.log(error);
      }
    );

    const responseUsers = await users.json();

    function countUsers() {
      const countUsers = responseUsers.data
        .map((item) => {
          return item.id;
        })
        .reduce((acc) => {
          acc++;
          return acc;
        });

      return countUsers;
    }
    const coffeeCategories = await fetch(
      "http://localhost:3002/api/categories-products"
    ).catch((error) => {
      console.log(error);
    });

    const responseCategories = await coffeeCategories.json();

    function countCategories() {
      const countCategories = responseCategories.data
        .map((item) => {
          return item.id;
        })
        .reduce((acc) => {
          acc++;
          return acc;
        });

      return countCategories;
    }

    this.setState({
      products: countProducts(),
      userQuantity: countUsers(),
      coffeeCategories: countCategories(),
    });
  }
}

export default ContenRowProducts;
