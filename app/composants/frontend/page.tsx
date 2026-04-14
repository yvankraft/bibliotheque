import React from "react";

const page = () => {
  return (
    <main className="flex flex-col h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-2xl font-bold mb-4">
          🚧 En cours de développement
        </h2>
        <p className="text-neutral-400">
          Le contenu de cette page est actuellement en cours de création. Elle
          sera mise en ligne dès qu'elle sera prête. Merci de votre patience !
        </p>
      </div>
      <div className="flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-2xl font-bold mb-4">🚧 Under Development</h2>
        <p className="text-neutral-400">
          This page is currently under construction. It will be published as
          soon as it's ready. Thank you for your patience!
        </p>
      </div>
      <div className="flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-2xl font-bold mb-4">🚧 In Entwicklung</h2>
        <p className="text-neutral-400">
          Diese Seite befindet sich derzeit noch im Aufbau. Sie wird online
          gehen, sobald sie fertiggestellt ist. Vielen Dank für Ihr Verständnis!
        </p>
      </div>
    </main>
  );
};

export default page;
