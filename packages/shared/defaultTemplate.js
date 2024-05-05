export default `<article class="card">
    <div class="card__header">
      <figure>
        <img :src="image" alt="">
      </figure>
      <h1 class="card__heading">
            <slot name="title">Title</slot>
      </h1>
    </div>
    <div class="card__body">
    <slot>test</slot>
    </div>
    <div class="card__footer">
      <button>Action</button>
    </div>
  </article>`