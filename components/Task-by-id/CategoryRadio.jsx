function CategoryRadio({ categories, checkedCategory, handleCategoryChange }) {
  return (
    <div className="mt-4 mb-10 flex flex-col sm:flex-row justify-center">
      {categories.map((category, index) => (
        <div key={index} className="flex sm:ml-7 mt-3">
          <input
            type="radio"
            name="category"
            className="w-5 h-5 cursor-pointer"
            checked={checkedCategory === category}
            onChange={() => handleCategoryChange(category)}
          />
          <h6 className="ml-1 -mt-1 text-lg">{category}</h6>
        </div>
      ))}
    </div>
  );
}

export default CategoryRadio;
