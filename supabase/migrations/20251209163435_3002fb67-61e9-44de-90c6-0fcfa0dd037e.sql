-- Eliminar la constraint de foreign key hacia auth.users en profiles
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_user_id_fkey;

-- Lo mismo para posts si existe
ALTER TABLE public.posts DROP CONSTRAINT IF EXISTS posts_user_id_fkey;

-- Lo mismo para comments si existe  
ALTER TABLE public.comments DROP CONSTRAINT IF EXISTS comments_user_id_fkey;

-- Lo mismo para likes si existe
ALTER TABLE public.likes DROP CONSTRAINT IF EXISTS likes_user_id_fkey;