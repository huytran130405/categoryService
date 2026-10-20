const idParam = {
  name: "id",
  in: "path",
  required: true,
  description: "ID của category",
  schema: { type: "integer", example: 1 },
};

const error = (description) => ({
  description,
  content: {
    "application/json": { schema: { $ref: "#/components/schemas/Error" } },
  },
});

const categoryBody = {
  required: true,
  content: {
    "application/json": { schema: { $ref: "#/components/schemas/CategoryInput" } },
  },
};

const categoryResponse = (description) => ({
  description,
  content: {
    "application/json": { schema: { $ref: "#/components/schemas/Category" } },
  },
});

export default {
  openapi: "3.0.3",
  info: {
    title: "Category Service API",
    version: "1.0.0",
    description: "CRUD quản lý categories",
  },
  servers: [{ url: "/" }],
  tags: [{ name: "Categories" }],
  paths: {
    "/categories": {
      get: {
        tags: ["Categories"],
        summary: "Lấy danh sách categories",
        responses: {
          200: {
            description: "Danh sách categories, sắp xếp theo id",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Category" },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Categories"],
        summary: "Tạo category mới",
        requestBody: categoryBody,
        responses: {
          201: categoryResponse("Đã tạo"),
          400: error("Thiếu name"),
          409: error("name đã tồn tại"),
        },
      },
    },
    "/categories/{id}": {
      get: {
        tags: ["Categories"],
        summary: "Lấy category theo id",
        parameters: [idParam],
        responses: {
          200: categoryResponse("Category tìm thấy"),
          404: error("Không tìm thấy"),
        },
      },
      put: {
        tags: ["Categories"],
        summary: "Cập nhật category",
        description: "Ghi đè cả name và description; name là bắt buộc.",
        parameters: [idParam],
        requestBody: categoryBody,
        responses: {
          200: categoryResponse("Đã cập nhật"),
          400: error("Thiếu name"),
          404: error("Không tìm thấy"),
          409: error("name đã tồn tại"),
        },
      },
      delete: {
        tags: ["Categories"],
        summary: "Xoá category",
        parameters: [idParam],
        responses: {
          204: { description: "Đã xoá" },
          404: error("Không tìm thấy"),
        },
      },
    },
  },
  components: {
    schemas: {
      Category: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          name: { type: "string", example: "Electronics" },
          description: { type: "string", nullable: true, example: "Thiết bị điện tử" },
          created_at: { type: "string", format: "date-time" },
        },
      },
      CategoryInput: {
        type: "object",
        required: ["name"],
        properties: {
          name: { type: "string", example: "Electronics" },
          description: { type: "string", nullable: true, example: "Thiết bị điện tử" },
        },
      },
      Error: {
        type: "object",
        properties: { error: { type: "string", example: "Not found" } },
      },
    },
  },
};
