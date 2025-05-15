import InvestorInterestForm from "@/components/investor-interest-form";

export default function Home() {
  return (
    <main className=" py-10 px-4">
      <div className="">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Investment Interest
        </h1>
        <p className="text-muted-foreground mb-8">
          Please complete this form to express your interest in investing in our
          startup.
        </p>
        <InvestorInterestForm />
      </div>
    </main>
  );
}
