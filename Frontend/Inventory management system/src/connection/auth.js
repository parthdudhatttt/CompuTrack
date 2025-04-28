import Database from "./database/database";

class Auth {
  constructor() {
    this.database = Database;
  }

  // Login user
  async login(email, password) {
    try {
      const response = await this.database.login(email, password);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Register user
  async register(userData) {
    try {
      const response = await this.database.register(userData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Get warehouses
  async getWarehouses() {
    try {
      const response = await this.database.getWarehouses();
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Get warehouse by id
  async getWarehouseById(id) {
    try {
      const response = await this.database.getWarehouseById(id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Add warehouse
  async addWarehouse(warehouseData) {
    try {
      const response = await this.database.addWarehouse(warehouseData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Delete warehouse
  async deleteWarehouse(id) {
    try {
      const response = await this.database.deleteWarehouse(id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Update warehouse
  async updateWarehouse(warehouseData) {
    try {
      const response = await this.database.updateWarehouse(warehouseData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  //Get all products
  async getAllProducts() {
    try {
      const response = await this.database.getAllProducts();
      return response;
    } catch (error) {
      throw error;
    }
  }

  //Add product
  async addProduct(productData) {
    try {
      const response = await this.database.addProduct(productData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  //Delete product
  async deleteProduct(id) {
    try {
      const response = await this.database.deleteProduct(id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  //Update product
  async updateProduct(productData) {
    try {
      const response = await this.database.updateProduct(productData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  //Get product by productNo
  async getProductByProductNo(productNo) {
    try {
      const response = await this.database.getProductByProductNo(productNo);
      return response;
    } catch (error) {
      throw error;
    }
  }

  //Get all warehouse products
  async getAllWarehouseProducts() {
    try {
      const response = await this.database.getAllWarehouseProducts();
      return response;
    } catch (error) {
      throw error;
    }
  }

  //Get warehouse product by id
  async getWarehouseProductById(id) {
    try {
      const response = await this.database.getWarehouseProductById(id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  //Add warehouse product
  async addWarehouseProduct(warehouseProductData) {
    try {
      const response = await this.database.addWarehouseProduct(
        warehouseProductData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  //Delete warehouse product
  async deleteWarehouseProduct(id) {
    try {
      const response = await this.database.deleteWarehouseProduct(id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  //Update warehouse product
  async updateWarehouseProduct(warehouseProductData) {
    try {
      const response = await this.database.updateWarehouseProduct(
        warehouseProductData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  //Get warehouse product by productNo
  async getWarehouseProductByProductNo(productNo) {
    try {
      const response = await this.database.getWarehouseProductByProductNo(
        productNo
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  //Get warehouse product by warehouseId
  async getProductsByWarehouseId(id) {
    try {
      const response = await this.database.getProductsByWarehouseId(id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  //Get History
  async getHistory() {
    try {
      const response = await this.database.getHistory();
      return response;
    } catch (error) {
      throw error;
    }
  }

  //Delete History
  async deleteHistory(id) {
    try {
      const response = await this.database.deleteHistory(id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  //Get all categories
  async getCategories() {
    try {
      const response = await this.database.getCategories();
      return response;
    } catch (error) {
      throw error;
    }
  }

  //Add category
  async addCategory(categoryData) {
    try {
      const response = await this.database.addCategory(categoryData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  //Delete category
  async deleteCategory(id) {
    try {
      const response = await this.database.deleteCategory(id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  //Generate report
  async generateReport(fromDate, toDate) {
    try {
      const response = await this.database.generateReport(fromDate, toDate);
      return response;
    } catch (error) {
      throw error;
    }
  }

  //upload image api in backend
  async uploadImage(filename, contentType) {
    try {
      const response = await this.database.uploadImage(filename, contentType);
      return response;
    } catch (error) {
      throw error;
    }
  }

  //upload image api in aws
  /* async uploadImageToAws(url, file) {
    try {
      const response = await this.database.uploadImageToAws(url, file);
      return response;
    } catch (error) {
      throw error;
    }
  } */
}

const auth = new Auth();
export default auth;
