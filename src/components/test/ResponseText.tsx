import * as React from "react";

function ResponseText() {
  return (
    <>
      <form>
        <div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Write down what happened during the previous conversation
            </label>
            <textarea
              id="message"
              rows={4}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Write your thoughts here..."
            ></textarea>
          </div>
        </div>
      </form>
    </>
  );
}

export default ResponseText;
