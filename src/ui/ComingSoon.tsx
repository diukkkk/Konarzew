import { pl } from '../i18n/pl';

export function ComingSoon({ title, description }: { title: string; description: string }) {
  return (
    <section className="mx-auto max-w-2xl p-6">
      <h1 className="mb-2 text-2xl font-bold">{title}</h1>
      <p className="mb-6 text-stone-600">{description}</p>
      <p className="inline-block rounded-full bg-amber-100 px-4 py-2 font-medium text-amber-900">
        {pl.common.comingSoon}
      </p>
    </section>
  );
}
