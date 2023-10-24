import { createImage } from '@/app/utils/repositories/image';
import withErrorHandler from '@/app/utils/withErrorHandler';
import { NextRequest, NextResponse } from 'next/server';

export const POST = withErrorHandler(async (req: NextRequest) => {
  try {
    const {
      id,
      projectId,
      photoName,
      homeownerNotes,
      internalNotes,
      associatedEntityId,
    } = await req.json();

    const orgContext = req.headers.get('organization-context') || '';

    // Insert into Database
    const dbImage = await createImage({
      id,
      projectId,
      photoName,
      homeownerNotes,
      internalNotes,
      associatedEntityId,
    }, orgContext);

    const imageId = dbImage.id;

    return NextResponse.json({ status: 'success', imageId });
  } catch (err) {
    return new NextResponse((err as Error).message, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
});
