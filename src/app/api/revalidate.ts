import { revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const { tags } = (await req.json()) as { tags?: string | string[] };

    if (!tags || (Array.isArray(tags) && !tags.length)) {
      return Response.json(
        { error: 'Provide a non-empty "tags" value (string or array).' },
        { status: 400 },
      );
    }

    const tagList = Array.isArray(tags) ? tags : [tags];

    for (const tag of tagList) revalidateTag(tag);

    return Response.json({ revalidated: tagList });
  } catch {
    return Response.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }
};
