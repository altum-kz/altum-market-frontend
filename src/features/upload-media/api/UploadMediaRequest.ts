import {apiRequest} from "@/shared/api";
import {
    GenerateUploadUrlRequest,
    UploadUrlResponse,
    ConfirmUploadRequest,
    MediaType,
    ConfirmUploadResponse
} from "../model/types";

export async function generateUploadUrlRequest(request: GenerateUploadUrlRequest): Promise<UploadUrlResponse[]> {
    return await apiRequest<UploadUrlResponse[]>("/api/v1/media/upload-url", {
        method: "POST",
        body: request
    });
}

export async function confirmUploadRequest(request: ConfirmUploadRequest): Promise<ConfirmUploadResponse[]> {
    return await apiRequest<ConfirmUploadResponse[]>("/api/v1/media/confirm-upload", {
        method: "POST",
        body: request,
    });
}

export async function uploadMedia(file: File): Promise<ConfirmUploadResponse> {
    const [{ upload_url, file_path }] = await generateUploadUrlRequest({
        files: [{ client_filename: file.name, mime_type: file.type as MediaType}],
    });

    await fetch(upload_url, { method: "PUT", body: file, headers: { "Content-Type": file.type } });

    const [confirmed] = await confirmUploadRequest({
        files: [{ file_path, media_type: file.type as MediaType, media_size: file.size }],
    });

    return confirmed;
}
