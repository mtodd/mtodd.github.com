require 'erb'

DraftsPath = File.join(File.dirname(__FILE__), '_drafts')
Drafts = Dir.glob(File.join(DraftsPath, '*'))
GeneratorPath = File.join(File.dirname(__FILE__), '_generator')
PostsPath = File.join(File.dirname(__FILE__), '_posts')

desc "Publish a draft"
task :publish do
  
  puts "Select article to publish:"
  
  Drafts.each_with_index do |draft, index|
    draft.split('/').last =~ /([\w\s]+)\.(\w+)/
    title, extension = $1, $2
    puts "%5i. %s" % [index, title]
  end
  
  print "Publish which: "; $stdout.flush
  article = $stdin.gets.chomp.to_i
  puts ""
  
  raise ArgumentError.new("Selected article doesn't exist.") unless article = Drafts[article]
  
  @body = File.read(article)
  article.split('/').last =~ /([\w\s]+)\.(\w+)/
  @title, @extension = $1, $2
  
  puts "Would you like to specify an excerpt?\n"
  @excerpt = $stdin.gets.chomp
  puts ""
  
  puts "Generating post..."
  post = ERB.new(File.read(File.join(GeneratorPath, 'post.html'))).result
  
  published_at = Time.now
  published_timestamp = published_at.strftime("%Y-%m-%d")
  published_date = published_at.strftime("%b %d %Y")
  filename = "%s-%s.%s" % [published_timestamp, @title.downcase.gsub(/[\W]+/, '-'), @extension]
  
  puts "Saving post..."
  file = File.open(File.join(PostsPath, filename), 'w+')
  file.write post
  file.close
  puts ""
  
  puts "Done!"
  puts ""
  
  puts "The diff of the draft to the post is:"
  puts `diff #{article} #{File.join(PostsPath, filename)}`
  
  print "Are you sure you want to delete the draft? (y/n): "; $stdout.flush
  if $stdin.gets.chomp =~ /y(es)?/i
    `rm #{article}`
    puts "Done! Draft removed!"
  else
    puts "Done! Draft remains."
  end
end
