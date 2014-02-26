desc "test_speed"
task "test_speed" => :environment do
  start_time = Time.now
  
  10000.times do |n|
    user = User.create!(
			:email => (0...20).map { ('a'..'z').to_a[rand(10)] }.join + "@mail.com",
			:name => (0...10).map { ('a'..'z').to_a[rand(10)] }.join
		)
    
    if n%20 == 0
      puts "#{n} : #{user.email}"
      if n%200 == 0
        puts "====================================#{Time.now}"
      else
        puts "------------------------------------#{Time.now}"
      end
    end

  end
  
  end_time = Time.now
  
  puts "------------------------------------"
  puts "TEST SPEED #1"
  puts "START : #{start_time}"
  puts "END : #{end_time}"
  puts "------------------------------------"
  puts "TOTAL : #{end_time - start_time}sec"
end
