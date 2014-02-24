desc "test_speed"
task "test_speed" => :environment do
  start_time = Time.now
  
  5000.times do |n|
    user = User.create!(
			:email => (0...20).map { ('a'..'z').to_a[rand(10)] }.join + "@mail.com",
			:name => (0...10).map { ('a'..'z').to_a[rand(10)] }.join
		)
    puts "#{n} : #{user.email}"
    
    if n%10 == 0
      if n%100 == 0
        puts "====================================#{Time.now}"
      else
        puts "------------------------------------#{Time.now}"
      end
    end

  end
  
  end_time = Time.now
  
  puts "------------------------------------"
  puts "START : #{start_time}"
  puts "END : #{end_time}"
  puts "------------------------------------"
  puts "TOTAL : #{end_time - start_time}sec"
end
