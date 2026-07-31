import type { components } from "@/shared/api";

export type GenerateUploadUrlRequest = components["schemas"]["GenerateUploadUrlRequest"];

export type UploadUrlResponse = components["schemas"]["UploadUrlResponse"];

export type ConfirmUploadRequest = components["schemas"]["ConfirmUploadRequest"];

export type ConfirmUploadResponse = components["schemas"]["ConfirmUploadResponse"];

export type MediaType = components["schemas"]["MediaType"];

export interface MediaItem {
    id: string;
    file: File;
    previewUrl: string;
    status: "uploading" | "done" | "error";
    confirmed?: ConfirmUploadResponse;
}