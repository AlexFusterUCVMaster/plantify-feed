-- Drop existing delete policy for comments
DROP POLICY IF EXISTS "Users can delete their own comments" ON public.comments;

-- Create new delete policy that allows comment owner OR post owner to delete
CREATE POLICY "Users can delete their own comments or post owner can delete" 
ON public.comments 
FOR DELETE 
USING (
  auth.uid() = user_id 
  OR 
  auth.uid() = (SELECT user_id FROM public.posts WHERE id = post_id)
);