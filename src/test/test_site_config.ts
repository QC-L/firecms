import { buildCollection, buildSchema, EnumValues } from "../models";
import { CMSAppProps } from "../CMSAppProps";

const locales: EnumValues = {
    "de-DE": "German",
    "en-US": "English (United States)",
    "es-ES": "Spanish (Spain)",
    "es-419": "Spanish (South America)"
};

export const productSchema = buildSchema({
    name: "Product",
    properties: {
        name: {
            title: "Name",
            validation: { required: true },
            dataType: "string"
        },
        price: {
            title: "Price",
            validation: {
                required: true,
                requiredMessage: "You must set a price between 0 and 1000",
                min: 0,
                max: 1000
            },
            description: "Price with range validation",
            dataType: "number"
        },
        status: {
            title: "Status",
            validation: { required: true },
            dataType: "string",
            description: "Should this product be visible in the website",
            longDescription: "Example of a long description hidden under a tooltip. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis bibendum turpis. Sed scelerisque ligula nec nisi pellentesque, eget viverra lorem facilisis. Praesent a lectus ac ipsum tincidunt posuere vitae non risus. In eu feugiat massa. Sed eu est non velit facilisis facilisis vitae eget ante. Nunc ut malesuada erat. Nullam sagittis bibendum porta. Maecenas vitae interdum sapien, ut aliquet risus. Donec aliquet, turpis finibus aliquet bibendum, tellus dui porttitor quam, quis pellentesque tellus libero non urna. Vestibulum maximus pharetra congue. Suspendisse aliquam congue quam, sed bibendum turpis. Aliquam eu enim ligula. Nam vel magna ut urna cursus sagittis. Suspendisse a nisi ac justo ornare tempor vel eu eros.",
            config: {
                enumValues: {
                    private: "Private",
                    public: "Public"
                }
            }
        },
        categories: {
            title: "Categories",
            validation: { required: true },
            dataType: "array",
            of: {
                dataType: "string",
                config: {
                    enumValues: {
                        electronics: "Electronics",
                        books: "Books",
                        furniture: "Furniture",
                        clothing: "Clothing",
                        food: "Food"
                    }
                }
            }
        },
        image: {
            title: "Image",
            dataType: "string",
            config: {
                storageMeta: {
                    mediaType: "image",
                    storagePath: "images",
                    acceptedFiles: ["image/*"]
                }
            }
        },
        tags: {
            title: "Tags",
            description: "Example of generic array",
            validation: { required: true },
            dataType: "array",
            of: {
                dataType: "string"
            }
        },
        description: {
            title: "Description",
            description: "Not mandatory but it'd be awesome if you filled this up",
            longDescription: "Example of a long description hidden under a tooltip. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis bibendum turpis. Sed scelerisque ligula nec nisi pellentesque, eget viverra lorem facilisis. Praesent a lectus ac ipsum tincidunt posuere vitae non risus. In eu feugiat massa. Sed eu est non velit facilisis facilisis vitae eget ante. Nunc ut malesuada erat. Nullam sagittis bibendum porta. Maecenas vitae interdum sapien, ut aliquet risus. Donec aliquet, turpis finibus aliquet bibendum, tellus dui porttitor quam, quis pellentesque tellus libero non urna. Vestibulum maximus pharetra congue. Suspendisse aliquam congue quam, sed bibendum turpis. Aliquam eu enim ligula. Nam vel magna ut urna cursus sagittis. Suspendisse a nisi ac justo ornare tempor vel eu eros.",
            dataType: "string",
            columnWidth: 300
        },
        published: {
            title: "Published",
            dataType: "boolean",
            columnWidth: 100
        },
        expires_on: {
            title: "Expires on",
            dataType: "timestamp"
        },
        publisher: {
            title: "Publisher",
            description: "This is an example of a map property",
            dataType: "map",
            properties: {
                name: {
                    title: "Name",
                    dataType: "string"
                },
                external_id: {
                    title: "External id",
                    dataType: "string"
                }
            }
        }
    }
});

const subcollections = [
    buildCollection({
        name: "Locales",
        relativePath: "locales",
        schema: {
            customId: locales,
            name: "Locale",
            properties: {
                title: {
                    title: "Title",
                    validation: { required: true },
                    dataType: "string"
                },
                selectable: {
                    title: "Selectable",
                    description: "Is this locale selectable",
                    dataType: "boolean"
                },
                video: {
                    title: "Video",
                    dataType: "string",
                    validation: { required: false },
                    storageMeta: {
                        mediaType: "video",
                        storagePath: "videos",
                        acceptedFiles: ["video/*"]
                    }
                }
            }
        }
    })
];

export const siteConfig: CMSAppProps = {
    name: "Test site",
    navigation: [
        buildCollection({
            relativePath: "products",
            schema: productSchema,
            name: "Products",
            subcollections: subcollections,
            properties: ["name", "price", "status", "categories", "tags", "description", "published", "added_on", "publisher", "available_locales", "image"]
        }),
        buildCollection({
            relativePath: "sites/es/products",
            schema: productSchema,
            name: "Products",
            subcollections: subcollections,
            properties: ["name", "price", "status", "categories", "tags", "description", "published", "added_on", "publisher", "available_locales", "image"]
        }),
        buildCollection({
            relativePath: "products/id/subcollection_inline",
            schema: productSchema,
            name: "Products",
            subcollections: subcollections,
        })
    ]
};



