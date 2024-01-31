const message = 'Ol%C3%A1%2C%20tudo%20bem%3F%20Aqui%20%C3%A9%20o%20entregador%20do%20Rapidex%2C%20preciso%20da%20sua%20localiza%C3%A7%C3%A3o%20para%20fazer%20a%20entrega%20do%20seu%20pedido%21%20';

const apiWhatsapp = 'https://wa.me';

export const getLinkToWhatsapp = (phone: string) => `${apiWhatsapp}/55${phone}?text=${message}`