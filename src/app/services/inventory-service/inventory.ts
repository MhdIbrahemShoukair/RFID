export interface InventoryItem {
    ITEM_CODE: string,
    HSN_CODE?: string,
    BAR_CODE?: string,
    ITEM_DESCRIPTION: string,
    UNIT_OF_MEASUREMENT: string,
    ITEM_WEIGHT?: string,
    ITEM_VOLUME?: string,
    ITEM_CATEGORY: string,
    ITEM_CLASSIFICATION: string
};
export interface Warehouse {
    WAREHOUSE_CODE: string,
    WAREHOUSE_NAME: string,
    LOCATION: string,
    COUNTRY: string,
    CITY: string,
    ZONE_: string,
    STREET?: string,
    BULIDING: string,
    POSTAL_CODE: number
};