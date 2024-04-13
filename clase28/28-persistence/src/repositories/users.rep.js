import OrderDTO from "../order.dto.js";
import dao from "../index.factory.js";

const { orders } = dao;

class OrdersRep {
  constructor() {
    this.model = orders;
  }
  create = async (data) => {
    data = new OrderDTO(data);
    const response = await this.model.create(data);
    return response;
  };
  read = async ({ filter, options }) =>
    await this.model.read({ filter, options });
  readOne = async (id) => await this.model.readOne(id);
  readByEmail = async (email) => await this.model.readByEmail(email);
  update = async (id, data) => await this.model.update(id, data);
  destroy = async (id) => await this.model.destroy(id);
}

const repository = new OrdersRep();
export default repository;
