/* tslint:disable */
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import siteMetadata from '@/data/siteMetadata';

export const config = {
  runtime: 'experimental-edge'
};

const fontBold = fetch(
  new URL('../../assets/Inter-Bold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());
const fontRegular = fetch(
  new URL('../../assets/Inter-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer());
const fontMedium = fetch(
  new URL('../../assets/Inter-Medium.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  const fontDataBold = await fontBold;
  const fontDataRegular = await fontRegular;
  const fontDataMedium = await fontMedium;
  try {
    const { searchParams } = new URL(req.url);

    // ?title=<title>
    const hasTitle = searchParams.has('title');
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'My default title';

    const isArticleLayout = searchParams.has('article');

    const hasImageUrl = searchParams.has('imgSrc');
    const imageSrc = hasImageUrl
      ? searchParams.get('imgSrc')?.slice(0, 1000)
      : null;

    const hasDescription = searchParams.has('description');
    const description = hasDescription
      ? searchParams.get('description')?.slice(0, 1000)
      : 'My default description';

    const isArticleOg = isArticleLayout && hasImageUrl && hasDescription;

    // console.log(isArticleOg);

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#121826',
            position: 'relative'
          }}
        ></div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter-Bold',
            data: fontDataBold,
            style: 'normal'
          },
          {
            name: 'Inter-Regular',
            data: fontDataRegular,
            style: 'normal'
          },
          {
            name: 'Inter-Medium',
            data: fontDataMedium,
            style: 'normal'
          }
        ]
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500
    });
  }
}
