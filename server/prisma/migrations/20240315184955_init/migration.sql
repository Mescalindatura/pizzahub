-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "contains" TEXT NOT NULL,
    "price" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "items" BLOB NOT NULL,
    "totalPrice" REAL NOT NULL,
    "estimatedTime" INTEGER NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT NOT NULL,
    "storeName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SiteSetting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "defaultValue" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserSetting" (
    "recordID" BIGINT NOT NULL PRIMARY KEY,
    "userID" INTEGER NOT NULL,
    "settingID" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    CONSTRAINT "UserSetting_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserSetting_settingID_fkey" FOREIGN KEY ("settingID") REFERENCES "SiteSetting" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Item_name_key" ON "Item"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_storeName_key" ON "User"("storeName");
