-- CreateTable
CREATE TABLE "Product" (
    "id_product" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id_product")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id_customer" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ident_document" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "street_name" TEXT NOT NULL,
    "house_number" TEXT NOT NULL,
    "complements" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id_customer")
);

-- CreateTable
CREATE TABLE "Order" (
    "id_order" SERIAL NOT NULL,
    "date_order" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "id_customer" INTEGER NOT NULL,
    "id_orderItem" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id_order")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id_orderItem" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "id_product" INTEGER NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id_orderItem")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_id_customer_fkey" FOREIGN KEY ("id_customer") REFERENCES "Customer"("id_customer") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_id_orderItem_fkey" FOREIGN KEY ("id_orderItem") REFERENCES "OrderItem"("id_orderItem") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product"("id_product") ON DELETE RESTRICT ON UPDATE CASCADE;
