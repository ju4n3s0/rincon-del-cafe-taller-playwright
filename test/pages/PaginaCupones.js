export class PaginaCupones {
  constructor(page) {
    this.page = page;
    this.menuCupones = page.getByRole('button', { name: 'Cupones', exact: true });
    this.codigo = page.getByLabel('Código');
    this.subtotal = page.getByLabel('Subtotal');
    this.correoCliente = page.getByLabel('Correo del cliente');
    this.botonAplicar = page.getByRole('button', { name: 'Aplicar cupón' });
    this.botonUsar = page.getByRole('button', { name: 'Usar cupón' });
    this.estado = page.getByTestId('estado-cupon');
    this.descuento = page.getByTestId('descuento');
    this.total = page.getByTestId('total-cupon');
    this.mensaje = page.getByRole('status');
  }

  async ir() {
    await this.menuCupones.click();
  }

  async aplicar(codigo, subtotal, correo) {
    await this.codigo.fill(codigo);
    await this.subtotal.fill(String(subtotal));
    await this.correoCliente.fill(correo);
    await this.botonAplicar.click();
  }

  async usar() {
    await this.botonUsar.click();
  }
}
