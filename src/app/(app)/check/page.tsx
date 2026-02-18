export default function Check() {
    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight border-y border-subtle -ml-[50vw] -mr-[50vw] relative left-1/2 right-1/2 w-screen px-[calc(50vw-50%+0.5rem)]">Check Page</h1>
            <p className="text-base leading-7 border-y border-subtle -ml-[50vw] -mr-[50vw] relative left-1/2 right-1/2 w-screen px-[calc(50vw-50%+0.5rem)]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, nulla labore error dolores atque quaerat tenetur voluptas deleniti officia cumque asperiores earum, provident nostrum explicabo voluptatibus quia magni itaque, veritatis obcaecati reiciendis in soluta sapiente laborum. Laudantium saepe eligendi commodi facilis, quod, temporibus eos ex ut ipsam deserunt consequatur voluptatem quos provident quo dolore fugiat earum. Laudantium deleniti accusamus minima sint aut, magni fugit nostrum maxime? Corporis officiis soluta dignissimos? Hic dolores ipsum necessitatibus voluptas obcaecati in veniam, at perferendis quos, totam iusto voluptate, autem molestias voluptatibus cum nihil labore eum reiciendis laborum mollitia? Delectus dolorem cumque aperiam numquam, perferendis nam optio distinctio magni natus itaque quaerat dolor ab sapiente odio totam nulla. Nemo odit consequatur unde praesentium ad ea cumque, exercitationem quibusdam?</p>

            <section className="border-y -ml-[50vw] -mr-[50vw] relative left-1/2 right-1/2 w-screen px-[calc(50vw-50%+0.5rem)] border-subtle">
            <div className="p-8 space-y-6 font-mono">
      <section>
        <h2 className="text-xl font-bold mb-2">Basic Characters</h2>
        <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
        <p>abcdefghijklmnopqrstuvwxyz</p>
        <p>0123456789</p>
      </section>
      
      <section>
        <h2 className="text-xl font-bold mb-2">Special Characters</h2>
        <p>!@#$%^&*()_+-=[]{}|;:'",.&lt;&gt;/?~`</p>
      </section>
      
      <section>
        <h2 className="text-xl font-bold mb-2">Accented Characters</h2>
        <p>ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞß</p>
        <p>àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ</p>
      </section>
      
      <section>
        <h2 className="text-xl font-bold mb-2">Programming Ligatures</h2>
        <p className="font-mono text-lg">-&gt;  --&gt;  &lt;-  &lt;--  =&gt;  ==  ===  !==  &lt;=  &gt;=  ::  :?  &amp;&amp;  ||</p>
      </section>
      
      <section>
        <h2 className="text-xl font-bold mb-2">All Weights Test</h2>
        <p className="font-light">Light 300 - The quick brown fox jumps over the lazy dog</p>
        <p className="font-normal">Regular 400 - The quick brown fox jumps over the lazy dog</p>
        <p className="font-semibold">SemiBold 600 - The quick brown fox jumps over the lazy dog</p>
        <p className="font-bold">Bold 700 - The quick brown fox jumps over the lazy dog</p>
      </section>
    </div>
            </section>
        </div>
    )
}
