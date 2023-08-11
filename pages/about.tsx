import {
  convertToArticleList,
  getPublishedArticles,
  getWorkTimelineData
} from '@/lib/notion';

import { Ad } from '@/components/Ad';
import { ArticleList } from '@/components/ArticleList';
import { Button } from '@/components/Button';
import { ButtonType } from '@/lib/types';
import { Container } from 'layouts/Container';
import CustomLink from '@/components/CustomLink';
import { GetStaticProps } from 'next';
import Image from 'next/legacy/image';
import { TimelineItem } from '@/components/TimelineItem';
import { TimelineList } from '@/components/TimelineList';
import siteMetadata from '@/data/siteMetadata';
import { useRouter } from 'next/router';

export default function About({ recentArticles, workTimeline }) {
  const { push } = useRouter();
  return (
    <Container title="About Me - Giuseppe">
      <h1>
        <span className="block text-base font-semibold tracking-wide text-center text-indigo-500 uppercase dark:text-teal-400">
          About me
        </span>
        <span className="block max-w-2xl mx-auto mt-2 text-4xl font-bold leading-10 text-center sm:text-5xl">
          Here's my story.
        </span>
      </h1>
      <p>
        I'm Giuseppe, a developer. This is my journey as a developer, i hope you
        like it.
      </p>
      <p>
        In 2023, I embarked on an exciting journey with WhatsAPI, contributing
        to the creation of ProPonte, a revolutionary project. As a dedicated
        team member, my role was to conceive and design a groundbreaking home
        automation beehive. This hive went beyond the ordinary, as it was
        equipped to monitor the environment's conditions in real time. Using
        advanced technology, we established a connection with Telegram to
        swiftly relay vital data and alert beekeepers when needed.
      </p>
      <div>
        <div className="hidden md:block md:float-left">
          <Image
            className="md:mr-8"
            src="https://res.cloudinary.com/dcxchmbqc/image/upload/v1691791519/rlwcvj8lifcrglhblxzn.jpg"
            placeholder="blur"
            blurDataURL="https://res.cloudinary.com/dcxchmbqc/image/upload/v1691791519/rlwcvj8lifcrglhblxzn.jpg"
            width={340}
            height={448}
            alt={'article cover'}
          />
        </div>
        <p>
          In the previous year, my passion for cybersecurity led me to the{' '}
          <CustomLink href="https://cyberchallege.it">
            Cyberchallenge.IT
          </CustomLink>{' '}
          initiative. This immersive experience allowed me to deepen my
          knowledge and skills in this dynamic field. The pinnacle of my journey
          was reaching the national finals of a rigorous competition held at the
          ICT ILO campus in Turin. This attack/defense style contest pushed my
          limits and expanded my understanding of cybersecurity.
        </p>
        <p>
          In 2021, I embraced the role of a Fullstack Developer Intern at
          MwSpace. Beyond my official title, I embraced the role of a client
          liaison, ensuring their orders were met to perfection. With Laravel
          and React as my tools, I crafted bespoke websites, ranging from
          captivating showcases to intricate e-commerce platforms. An admin
          panel for e-commerce was also born under my hands, streamlining
          operations.
        </p>
        <p>
          Another chapter in my journey unfolded with K-Kasas in the same year.
          My role as a Fullstack Developer meant enhancing the backend,
          introducing novel features, and untangling intricate codes without
          disrupting the software's flow. My touch was also evident in the
          implementation of an Observer-Observable pattern, highlighting my
          commitment to innovation and efficiency.
        </p>
        {/*<p>
          You can find me on <a href={siteMetadata.twitter}>Twitter</a> where I
          share tech-related tidbits and build in public, or you can follow me
          on <CustomLink href={siteMetadata.github}>GitHub</CustomLink>. I often
          write about my findings on my{' '}
          <CustomLink href={`${siteMetadata.siteUrl}/blog`}>blog</CustomLink>{' '}
          and create cool things over on{' '}
          <CustomLink href={siteMetadata.codepen}>CodePen</CustomLink>. I also
          help run a mediocre{' '}
  <CustomLink href="https://anchor.fm/florida-man">podcast</CustomLink>.
        </p>
  */}
        <div></div>
      </div>
      <hr className="my-16 w-full border-none text-center h-10 before:content-['∿∿∿'] before:text-[#D1D5DB] before:text-2xl"></hr>
      <div className="mt-12 space-y-6">
        <h2 className="m-0 text-gray-900 dark:text-white">Work experience</h2>
        <p>Here's a brief rundown of my most recent experiences.</p>
        {workTimeline ? (
          <TimelineList>
            {workTimeline.map((workItem, index) => (
              <TimelineItem
                key={index}
                title={workItem.title}
                meta={workItem.company}
                link={workItem.company_url}
                meta_small={workItem.duration}
                content={workItem.description}
              />
            ))}
          </TimelineList>
        ) : null}
        <Button
          onButtonClick={() => push(siteMetadata.resume)}
          buttonType={ButtonType.PRIMARY}
        >
          View my resume
        </Button>
      </div>
      <hr className="my-16 w-full border-none text-center h-10 before:content-['∿∿∿'] before:text-[#D1D5DB] before:text-2xl"></hr>
      <div className="mb-12">
        <h2>I love to share my knowledge through writing.</h2>
        <p>Check out a few of my most recent publishings.</p>
        <ArticleList articles={recentArticles} />
      </div>
      <hr className="my-16 w-full border-none text-center h-10 before:content-['∿∿∿'] before:text-[#D1D5DB] before:text-2xl"></hr>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await getPublishedArticles(process.env.BLOG_DATABASE_ID);
  const workTimeline = await getWorkTimelineData(process.env.WORK_TIMELINE_DB);
  const { articles } = convertToArticleList(data);

  return {
    props: {
      recentArticles: articles.slice(0, 3),
      workTimeline
    },
    revalidate: 200
  };
};
