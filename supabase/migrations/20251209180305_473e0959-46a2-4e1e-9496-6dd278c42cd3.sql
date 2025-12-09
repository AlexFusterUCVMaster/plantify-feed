-- Create storage bucket for plant images
INSERT INTO storage.buckets (id, name, public)
VALUES ('plants', 'plants', true);

-- Allow anyone to view plant images (public bucket)
CREATE POLICY "Public plant images are viewable by everyone"
ON storage.objects
FOR SELECT
USING (bucket_id = 'plants');

-- Allow authenticated users to upload plant images
CREATE POLICY "Authenticated users can upload plant images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'plants' AND auth.role() = 'authenticated');

-- Allow users to update their own plant images
CREATE POLICY "Users can update their own plant images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'plants' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow users to delete their own plant images
CREATE POLICY "Users can delete their own plant images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'plants' AND auth.uid()::text = (storage.foldername(name))[1]);