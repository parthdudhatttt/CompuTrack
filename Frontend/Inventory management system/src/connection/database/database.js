import conf from "../../conf/conf";
import axios from "axios";

class Database {
  constructor() {
    this.databaseUrl = conf.databaseUrl;
  }

  // User Login
  async login(email, password) {
    try {
      const response = await axios
        .post(`${this.databaseUrl}/api/user/login`, { email, password })
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        });
      if (response.success === false) {
        throw response;
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  // User Register
  async register(userData) {
    try {
      const response = await axios
        .post(`${this.databaseUrl}/api/user/register`, {
          name: userData.name,
          email: userData.email,
          password: userData.password,
        })
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        });

      if (response.success === false) {
        throw response;
      }
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Get all warehouses
  async getWarehouses() {
    try {
      const response = await axios
        .get(`${this.databaseUrl}/api/warehouse`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        });

      if (response.success === false) {
        throw response;
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  //get warehouse by id
  async getWarehouseById(id) {
    try {
      const response = await axios
        .get(`${this.databaseUrl}/api/warehouse/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        });
      if (response.success === false) {
        throw response;
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  //add warehouse
  async addWarehouse(warehouseData) {
    try {
      const response = await axios
        .post(`${this.databaseUrl}/api/warehouse`, warehouseData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        });
      if (response.success === false) {
        throw response;
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  //delete warehouse
  async deleteWarehouse(warehouseId) {
    try {
      const response = await axios
        .delete(`${this.databaseUrl}/api/warehouse/delete/${warehouseId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        });
      if (response.success === false) {
        throw response;
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  //update warehouse
  async updateWarehouse(warehouseData) {
    try {
      const response = await axios
        .put(`${this.databaseUrl}/api/warehouse/update`, warehouseData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        });
      if (response.success === false) {
        throw response;
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  //Get all products
  async getAllProducts() {
    try {
      const response = await axios
        .get(`${this.databaseUrl}/api/product`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        });
      if (response.success === false) {
        throw response;
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  //add product
  async addProduct(productData) {
    try {
      const response = await axios
        .post(`${this.databaseUrl}/api/product`, productData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        });
      if (response.success === false) {
        throw response;
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  //delete product
  async deleteProduct(productId) {
    try {
      const response = await axios
        .delete(`${this.databaseUrl}/api/product/delete/${productId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        });
      if (response.success === false) {
        throw response;
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  //update product
  async updateProduct(productData) {
    try {
      const response = await axios
        .put(`${this.databaseUrl}/api/product/update`, productData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        });
      if (response.success === false) {
        throw response;
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  //Get product by product No
  async getProductByProductNo(productNo) {
    try {
      const response = await axios
        .get(`${this.databaseUrl}/api/product/${productNo}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        });
      if (response.success === false) {
        throw response;
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  //Get all warehouse products
  async getAllWarehouseProducts() {
    try {
      const response = await axios
        .get(`${this.databaseUrl}/api/warehouseproduct`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        });
      if (response.success === false) {
        throw response;
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  //Get warehouse product by id
  async getWarehouseProductById(id) {
    try {
      const response = await axios
        .get(`${this.databaseUrl}/api/warehouseproduct/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        });
      if (response.success === false) {
        throw response;
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  //Add warehouse product
  async addWarehouseProduct(warehouseProduct) {
    try {
      const response = await axios
        .post(`${this.databaseUrl}/api/warehouseproduct`, warehouseProduct, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        });
      if (response.success === false) {
        throw response;
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  //Update warehouse product
  async updateWarehouseProduct(warehouseProduct) {
    try {
      const response = await axios
        .put(
          `${this.databaseUrl}/api/warehouseproduct/update`,
          warehouseProduct,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        });
      if (response.success === false) {
        throw response;
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  //Delete warehouse product
  async deleteWarehouseProduct(id) {
    try {
      const response = await axios
        .delete(`${this.databaseUrl}/api/warehouseproduct/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        });
      if (response.success === false) {
        throw response;
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  //Get warehouse products by warehouse id
  async getProductsByWarehouseId(id) {
    try {
      const response = await axios
        .get(`${this.databaseUrl}/api/warehouseproduct/warehouse/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        });
      if (response.success === false) {
        throw response;
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  //Get warehouse product by product no
  async getWarehouseProductByProductNo(productNo) {
    try {
      const response = await axios
        .get(`${this.databaseUrl}/api/warehouseproduct/product/${productNo}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        });
      if (response.success === false) {
        throw response;
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  //Get history
  async getHistory() {
    try {
      const response = await axios
        .get(`${this.databaseUrl}/api/history`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        });
      if (response.success === false) {
        throw response;
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  //delete history
  async deleteHistory(id) {
    try {
      const response = await axios
        .delete(`${this.databaseUrl}/api/history/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        });
      if (response.success === false) {
        throw response;
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  //Get categories
  async getCategories() {
    try {
      const response = await axios
        .get(`${this.databaseUrl}/api/category`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        });
      if (response.success === false) {
        throw response;
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  //Add category
  async addCategory(category) {
    try {
      const response = await axios
        .post(`${this.databaseUrl}/api/category`, category, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        });
      if (response.success === false) {
        throw response;
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  //Delete category
  async deleteCategory(id) {
    try {
      const response = await axios
        .delete(`${this.databaseUrl}/api/category/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        });
      if (response.success === false) {
        throw response;
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  //Generate report
  async generateReport(fromDate, toDate) {
    try {
      const response = await axios
        .post(
          `${this.databaseUrl}/api/history/report`,
          {
            fromDate,
            toDate
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        });
      if (response.success === false) {
        throw response;
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  //upload image api in backend
  async uploadImage(filename, contentType) {
    try {
      const response = await axios
        .post(
          `${this.databaseUrl}/api/product/upload`,
          { filename, contentType },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        });
      if (response.success === false) {
        throw response;
      }
      return response;
    } catch (error) {
      throw error;
    }
  } 

  //upload image api in aws
  /* async uploadImageToAws(url, file) {
    try {
      const response = await axios
        .put(
          `${url}`,
          { file },
          {
            headers: {
              "Content-Type": file.type,
            },
          }
        )
        .then((res) => res)
        .catch((error) => {
          throw error.response.data;
        });
      if (response.status != 200) {
        throw response;
      }
      return response;
    } catch (error) {
      throw error;
    }
  } */
}

const database = new Database();
export default database;
