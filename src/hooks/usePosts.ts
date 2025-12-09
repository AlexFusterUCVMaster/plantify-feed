import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface PostWithProfile {
  id: string;
  image_url: string;
  plant_name: string;
  description: string | null;
  likes_count: number;
  created_at: string;
  user_id: string;
  profile: {
    username: string | null;
    avatar_url: string | null;
  } | null;
  comments_count: number;
}

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async (): Promise<PostWithProfile[]> => {
      const { data: posts, error: postsError } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (postsError) throw postsError;

      // Fetch profiles separately
      const userIds = [...new Set(posts?.map((p) => p.user_id) || [])];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, username, avatar_url")
        .in("user_id", userIds);

      const profileMap = new Map(profiles?.map((p) => [p.user_id, p]));

      // Get comment counts
      const postIds = posts?.map((p) => p.id) || [];
      const { data: commentCounts } = await supabase
        .from("comments")
        .select("post_id")
        .in("post_id", postIds);

      const countMap = new Map<string, number>();
      commentCounts?.forEach((c) => {
        countMap.set(c.post_id, (countMap.get(c.post_id) || 0) + 1);
      });

      return (posts || []).map((post) => ({
        ...post,
        profile: profileMap.get(post.user_id) || null,
        comments_count: countMap.get(post.id) || 0,
      }));
    },
  });
};

export const usePost = (id: string | undefined) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      if (!id) return null;

      const { data: post, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      if (!post) return null;

      // Fetch profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("user_id", post.user_id)
        .maybeSingle();

      // Fetch comments with profiles
      const { data: comments } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", id)
        .order("created_at", { ascending: true });

      const commentUserIds = [...new Set(comments?.map((c) => c.user_id) || [])];
      const { data: commentProfiles } = await supabase
        .from("profiles")
        .select("user_id, username, avatar_url")
        .in("user_id", commentUserIds);

      const profileMap = new Map(commentProfiles?.map((p) => [p.user_id, p]));

      const commentsWithProfiles = (comments || []).map((comment) => ({
        ...comment,
        profile: profileMap.get(comment.user_id) || null,
      }));

      return {
        ...post,
        profile,
        comments: commentsWithProfiles,
      };
    },
    enabled: !!id,
  });
};
