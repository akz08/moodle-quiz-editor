class MoodleXMLGenerator
  def generate(category="Default for Front page", type, name)
    xml = Builder::XmlMarkup.new( :indent => 2)
    xml.instruct! :xml, :encoding => "UTF-8"

    xml.quiz do
    	# dummy question to specify category for import
      xml.comment! "question: 0"
      xml.tag!("question", {"type"=>"category"}) do
        xml.category { xml.text "$course$/#{category}"}
      end

      # scaffold for basic question data
    	xml.comment! "question: 0"
      xml.tag!("question", {"type"=>"#{type}"}) do
        xml.name { xml.text "#{name}"}
      end
      
    end
  end
end

# generator = MoodleXMLGenerator.new()
# puts generator.generate("category", "trueFalse", "name")