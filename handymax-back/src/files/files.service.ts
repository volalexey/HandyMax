import { BadRequestException, Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class FilesService {
    private supabase: SupabaseClient;

    constructor() {
        this.supabase = createClient(
            process.env.PUBLIC_SUPABASE_URL as string,
            process.env.SUPABASE_SERVICE_ROLE_KEY as string
        );
    }

    async uploadFile(file: Express.Multer.File) {
        if (!file) throw new BadRequestException('File is empty');

        const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
        const fileName = `${Date.now()}_${originalName.replace(/\s/g, '_')}`;

        const { error } = await this.supabase.storage
            .from('images')
            .upload(fileName, file.buffer, {
                contentType: file.mimetype,
                upsert: false,
            });

        if(error) {
            throw new BadRequestException(error.message);
        }

        const { data } = this.supabase.storage
            .from('images')
            .getPublicUrl(fileName);

        return { url: data.publicUrl };
    }
}
