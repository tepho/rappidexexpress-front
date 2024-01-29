export enum UserType {
  SHOPKEEPER = 'shopkeeper',
  MOTOBOY = 'motoboy',
  ADMIN = 'admin',
}

export enum Permissions {
  MASTER = 'master',
  ADMIN = 'admin',
  USER = 'none',
}

export enum StatusDelivery {
  PENDING = 'PENDENTE',
  ONCOURSE = 'ACAMINHO',
  COLLECTED = 'COLETADO',
  FINISHED = 'FINALIZADO',
  CANCELED = 'CANCELADO',
}

export enum PaymentType {
  DEBITO = 'DÉBITO',
  CREDITO = 'CRÉDITO',
  PIX = 'PIX',
  DINHEIRO = 'DINHEIRO',
}
