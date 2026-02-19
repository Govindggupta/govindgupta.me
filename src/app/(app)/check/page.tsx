export default function Check() {
    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight screen-line-after screen-line-before p-2">Check Page</h1>
            <p className="text-base leading-7 screen-line-after screen-line-before p-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, nulla labore error dolores atque quaerat tenetur voluptas deleniti officia cumque asperiores earum, provident nostrum explicabo voluptatibus quia magni itaque, veritatis obcaecati reiciendis in soluta sapiente laborum. Laudantium saepe eligendi commodi facilis, quod, temporibus eos ex ut ipsam deserunt consequatur voluptatem quos provident quo dolore fugiat earum. Laudantium deleniti accusamus minima sint aut, magni fugit nostrum maxime? Corporis officiis soluta dignissimos? Hic dolores ipsum necessitatibus voluptas obcaecati in veniam, at perferendis quos, totam iusto voluptate, autem molestias voluptatibus cum nihil labore eum reiciendis laborum mollitia? Delectus dolorem cumque aperiam numquam, perferendis nam optio distinctio magni natus itaque quaerat dolor ab sapiente odio totam nulla. Nemo odit consequatur unde praesentium ad ea cumque, exercitationem quibusdam?</p>

    <section className="screen-line-before screen-line-after">
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
      
      <section className="mb-8 screen-line-after screen-line-before">
  <h2 className="text-xl font-bold mb-4">All Font Variations</h2>
  
  {/* Light */}
  <div className="mb-6 p-4 bg-gray-900/20 rounded-lg">
    <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-2">Light 300</h3>
    <p className="font-light mb-2">The quick brown fox jumps over the lazy dog</p>
    <p className="font-light italic">The quick brown fox jumps over the lazy dog (Italic)</p>
  </div>
  
  {/* Regular */}
  <div className="mb-6 p-4 bg-gray-900/20 rounded-lg">
    <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-2">Regular 400</h3>
    <p className="font-normal mb-2">The quick brown fox jumps over the lazy dog</p>
    <p className="font-normal italic">The quick brown fox jumps over the lazy dog (Italic)</p>
  </div>
  
  {/* SemiBold */}
  <div className="mb-6 p-4 bg-gray-900/20 rounded-lg">
    <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-2">SemiBold 600</h3>
    <p className="font-semibold mb-2">The quick brown fox jumps over the lazy dog</p>
    <p className="font-semibold italic">The quick brown fox jumps over the lazy dog (Italic)</p>
  </div>
  
  {/* Bold */}
  <div className="mb-6 p-4 bg-gray-900/20 rounded-lg">
    <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-2">Bold 700</h3>
    <p className="font-bold mb-2">The quick brown fox jumps over the lazy dog</p>
    <p className="font-bold italic">The quick brown fox jumps over the lazy dog (Italic)</p>
  </div>
</section>
    </div>
            </section>
        </div>
    )
}
