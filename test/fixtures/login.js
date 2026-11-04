import { test as base, expect } from '@playwright/test';
import { PaginaLogin } from '../pages/PaginaLogin.js';
import { PaginaCupones } from '../pages/PaginaCupones.js';
import { usuarioDePrueba } from '../data/usuarios.js';

export const test = base.extend({
  paginaLogueada: async ({ page, request }, use) => {
    await request.post('/api/reiniciar');
    const login = new PaginaLogin(page);
    await login.ir();
    await login.iniciarSesion(usuarioDePrueba.correo, usuarioDePrueba.clave);
    await expect(login.menuCarrito).toBeVisible();

    await use(page);
  },

  paginaCupones: async ({ paginaLogueada }, use) => {
    const cupones = new PaginaCupones(paginaLogueada);
    await cupones.ir();

    await use(cupones);
  },
});

export { expect };
