import { test, expect } from '../fixtures/login.js';
import { usuarioDePrueba } from '../data/usuarios.js';
import { cuponVigente, cuponVencido, subtotalPrueba, mensajes } from '../data/cupones.js';

test('@acceptanceTest cupón vigente aplica el descuento sobre el subtotal', async ({ paginaCupones }) => {
  const descuento = (subtotalPrueba * cuponVigente.porcentaje) / 100;

  await paginaCupones.aplicar(cuponVigente.codigo, subtotalPrueba, usuarioDePrueba.correo);

  await expect(paginaCupones.estado).toHaveText('aplicado');
  await expect(paginaCupones.descuento).toHaveText(`$${descuento}`);
  await expect(paginaCupones.total).toHaveText(`$${subtotalPrueba - descuento}`);
});

test('@acceptanceTest cupón vencido no se aplica y muestra mensaje', async ({ paginaCupones }) => {
  await paginaCupones.aplicar(cuponVencido.codigo, subtotalPrueba, usuarioDePrueba.correo);

  await expect(paginaCupones.mensaje).toHaveText(mensajes.vencido);
  await expect(paginaCupones.estado).toHaveCount(0);
});

test('@acceptanceTest cupón ya usado por el cliente es rechazado', async ({ paginaCupones }) => {
  await paginaCupones.aplicar(cuponVigente.codigo, subtotalPrueba, usuarioDePrueba.correo);
  await paginaCupones.usar();
  await expect(paginaCupones.estado).toHaveText('usado');

  await paginaCupones.aplicar(cuponVigente.codigo, subtotalPrueba, usuarioDePrueba.correo);

  await expect(paginaCupones.mensaje).toHaveText(mensajes.yaUsado);
});
