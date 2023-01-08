const BASE_URL = "https://pharmacin.herokuapp.com/";

const PABRIK_PREFIX = "pabrik/";
const OBAT_PREFIX = "obat/";
const PEMBELIAN_PREFIX = "pembelian/";
const PENJUALAN_PREFIX = "penjualan/";

export const API_ACCESS = {
  login: BASE_URL + "login",
  register: BASE_URL + "register",
  add_pabrik: BASE_URL + PABRIK_PREFIX + "store-pabrik",
  get_all_pabrik: BASE_URL + PABRIK_PREFIX + "all-pabriks",
  delete_pabrik: BASE_URL + PABRIK_PREFIX + "delete-pabrik",
  update_pabrik: BASE_URL + PABRIK_PREFIX + "update-pabrik",
  add_kategori_obat: BASE_URL + OBAT_PREFIX + "store-kategori",
  get_all_kategori: BASE_URL + OBAT_PREFIX + "all-kategoris",
  delete_kategori: BASE_URL + OBAT_PREFIX + "delete-kategori",
  update_kategori: BASE_URL + OBAT_PREFIX + "update-kategori",
  get_all_obat: BASE_URL + OBAT_PREFIX + "all-obats",
  add_obat: BASE_URL + OBAT_PREFIX + "store-obat",
  show_obat: BASE_URL + OBAT_PREFIX + "list-obats",
  delete_obat: BASE_URL + OBAT_PREFIX + "delete-obat",
  update_obat: BASE_URL + OBAT_PREFIX + "update-obat",
  get_all_pembelian: BASE_URL + PEMBELIAN_PREFIX + "all-pembelians",
  add_pembelian: BASE_URL + PEMBELIAN_PREFIX + "store-pembelian",
  add_penjualan: BASE_URL + PENJUALAN_PREFIX + "store-penjualan",
  get_all_penjualan: BASE_URL + PENJUALAN_PREFIX + "all-penjualans",
  delete_penjualan: BASE_URL + PENJUALAN_PREFIX + "delete-penjualan",
};
